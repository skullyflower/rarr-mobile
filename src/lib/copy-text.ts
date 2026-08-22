import * as Clipboard from 'expo-clipboard';

export default function copyText(text: string): void {
  if (text) {
    Clipboard.setStringAsync(text);
  }
}

export function formatTitle(title: string): string {
  const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  if (datePattern.test(title)) {
    const [, year, month, day] = title.match(datePattern) ?? [];
    return new Date(`${year}/${month}/${day}`).toDateString();
  }
  return title;
}
