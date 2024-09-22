import { cn } from '@/lib/utils'

export function FOMO({ className }: { className?: string }) {
  const reason = getReason()

  return (
    <div
      className={cn(
        'bg-red-50/10 border border-red-400 text-red-300 text-xs font-bold py-1 px-1.5 rounded-full inline-flex items-center text-center justify-center',
        className,
      )}
    >
      {reason}
    </div>
  )
}

function getReason() {
  const holidays = [
    { date: '12-25', name: 'Christmas', emoji: '🎄' },
    { date: '01-01', name: 'New Year', emoji: '🎉' },
    { date: '07-04', name: 'Independence Day', emoji: '🇺🇸' },
    { date: '11-11', name: 'Veterans Day', emoji: '🎖️' },
    { date: '11-26', name: 'Thanksgiving', emoji: '🦃' },
    { date: '02-14', name: "Valentine's Day", emoji: '❤️' },
    { date: '03-17', name: "St. Patrick's Day", emoji: '☘️' },
    { date: '05-31', name: 'Memorial Day', emoji: '🇺🇸' },
    { date: '09-06', name: 'Labor Day', emoji: '👷' },
    { date: '10-31', name: 'Halloween', emoji: '🎃' },
    { date: '04-22', name: 'Earth Day', emoji: '🌍' },
    { date: '05-05', name: 'Cinco de Mayo', emoji: '🌮' },
    { date: '06-19', name: 'Juneteenth', emoji: '✊🏿' },
    { date: '09-22', name: 'Fall Equinox', emoji: '🍂' },
    { date: '12-31', name: "New Year's Eve", emoji: '🎆' },
    { date: '02-02', name: 'Groundhog Day', emoji: '🐿️' },
    { date: '03-14', name: 'Pi Day', emoji: '🥧' },
    { date: '04-01', name: "April Fools' Day", emoji: '🃏' },
    { date: '05-04', name: 'Star Wars Day', emoji: '🌠' },
    { date: '07-14', name: 'Bastille Day', emoji: '🇫🇷' },
    { date: '08-26', name: 'National Dog Day', emoji: '🐶' },
    { date: '10-04', name: 'World Animal Day', emoji: '🐾' },
    { date: '11-01', name: 'Day of the Dead', emoji: '💀' },
    { date: '12-21', name: 'Winter Solstice', emoji: '❄️' },
    { date: '01-28', name: 'Chinese New Year', emoji: '🧧' },
    ...['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07'].map(
      (date) => ({
        date,
        name: 'Back to School',
        emoji: '🎒',
      }),
    ),
    ...[
      '11-22',
      '11-23',
      '11-24',
      '11-25',
      '11-26',
      '11-27',
      '11-28',
      '11-29',
      '11-30',
    ].map((date) => ({
      date,
      name: 'Black Friday',
      emoji: '🛍️',
    })),
    ...[
      '12-24',
      '12-25',
      '12-26',
      '12-27',
      '12-28',
      '12-29',
      '12-30',
      '12-31',
    ].map((date) => ({
      date,
      name: 'Christmas',
      emoji: '🎅',
    })),
    ...[
      '11-01',
      '11-02',
      '11-03',
      '11-04',
      '11-05',
      '11-06',
      '11-07',
      '11-08',
      '11-09',
      '11-10',
      '11-11',
      '11-12',
      '11-13',
      '11-14',
      '11-15',
    ].map((date) => ({
      date,
      name: 'Early Holiday Shopping',
      emoji: '🎁',
    })),
    ...[
      '12-01',
      '12-02',
      '12-03',
      '12-04',
      '12-05',
      '12-06',
      '12-07',
      '12-08',
      '12-09',
      '12-10',
      '12-11',
      '12-12',
      '12-13',
      '12-14',
      '12-15',
    ].map((date) => ({
      date,
      name: 'Holiday Shopping Season',
      emoji: '🛒',
    })),
    { date: '02-14', name: "Valentine's Day", emoji: '💘' },
    { date: '03-17', name: "St. Patrick's Day", emoji: '🍀' },
    { date: '04-15', name: 'Tax Day', emoji: '📊' },
    { date: '05-08', name: "Mother's Day", emoji: '👩‍👧‍👦' },
    { date: '06-21', name: "Father's Day", emoji: '👨‍👧‍👦' },
    { date: '08-15', name: 'Back to School', emoji: '📚' },
    { date: '09-11', name: 'Patriot Day', emoji: '🇺🇸' },
    { date: '10-16', name: "Boss's Day", emoji: '👔' },
  ]

  const regularReasons = [
    { text: 'Limited time offer', emoji: '⏳' },
    { text: 'Early bird special', emoji: '🐦' },
    { text: 'Flash sale ending soon', emoji: '⚡' },
    { text: 'Last chance to save', emoji: '💰' },
    { text: 'Exclusive discount today', emoji: '🏷️' },
    { text: 'One-time deal', emoji: '🎯' },
    { text: 'Special launch pricing', emoji: '🚀' },
    { text: '24-hour sale', emoji: '🕒' },
    { text: 'Weekend offer only', emoji: '📅' },
    { text: 'First 100 customers', emoji: '🥇' },
  ]

  const today = new Date()
  const currentDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`

  const holidayToday = holidays.find((holiday) => holiday.date === currentDate)

  if (holidayToday) {
    return `${holidayToday.emoji} ${holidayToday.name} special offer`
  }

  const randomReason =
    regularReasons[Math.floor(Math.random() * regularReasons.length)]
  return `${randomReason.emoji} ${randomReason.text}`
}
