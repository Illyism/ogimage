#!/usr/bin/env bash
# Cursor Cloud install runs as a non-interactive login shell (bash -lc).
# Stock Ubuntu ~/.bashrc returns early in that mode, so PATH lines from the
# Bun installer and nvm never load. Pin tools and symlink them onto directories
# that stay on PATH without rc files.
set -euo pipefail

BUN_VERSION="1.4.2"
BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
NODE_MAJOR="24"
export BUN_INSTALL
export HUSKY=0

install_bun() {
  if command -v bun >/dev/null 2>&1; then
    if [ "$(bun --version)" = "$BUN_VERSION" ]; then
      return 0
    fi
  fi
  curl -fsSL https://bun.sh/install | bash -s -- "bun-v${BUN_VERSION}"
}

install_node24() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo "nvm is missing; Cursor's default image is expected to provide it" >&2
    exit 1
  fi
  # nvm is a shell function; it is not on PATH.
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm install "$NODE_MAJOR"
  nvm alias default "$NODE_MAJOR"
  nvm use "$NODE_MAJOR"
}

# Resolve the on-disk nvm binary. `nvm which current` can return the image
# Node 22 when /exec-daemon or /usr/local/cargo/bin sits earlier on PATH.
node24_bin() {
  local prefix="$NVM_DIR/versions/node"
  local dir
  dir="$(find "$prefix" -maxdepth 1 -type d -name "v${NODE_MAJOR}.*" | sort -V | tail -1)"
  if [ -z "$dir" ] || [ ! -x "$dir/bin/node" ]; then
    echo "Node ${NODE_MAJOR} is not installed under ${prefix}" >&2
    exit 1
  fi
  readlink -f "$dir/bin/node"
}

link_on_path() {
  local src="$1"
  local dest="$2"
  if [ "$src" = "$dest" ]; then
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  if [ -w "$(dirname "$dest")" ]; then
    ln -sfn "$src" "$dest"
  else
    sudo ln -sfn "$src" "$dest"
  fi
}

install_bun
install_node24

NODE_BIN="$(node24_bin)"
BUN_BIN="$(readlink -f "$BUN_INSTALL/bin/bun")"

# /usr/local/bin is on the default PATH. ~/.local/bin is prepended by ~/.profile.
# $BUN_INSTALL/bin is prepended wherever Bun's own PATH snippet runs.
# /usr/local/cargo/bin is first on this image and otherwise keeps /exec-daemon/node (v22).
link_on_path "$BUN_BIN" /usr/local/bin/bun
link_on_path "$BUN_BIN" "$HOME/.local/bin/bun"
link_on_path "$NODE_BIN" /usr/local/bin/node
link_on_path "$NODE_BIN" "$HOME/.local/bin/node"
link_on_path "$NODE_BIN" "$BUN_INSTALL/bin/node"
if [ -d /usr/local/cargo/bin ]; then
  link_on_path "$NODE_BIN" /usr/local/cargo/bin/node
  link_on_path "$BUN_BIN" /usr/local/cargo/bin/bun
fi

export PATH="$BUN_INSTALL/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

hash -r 2>/dev/null || true

cd "${CURSOR_REPO_DIR:-$(git rev-parse --show-toplevel)}"
bun install --frozen-lockfile
