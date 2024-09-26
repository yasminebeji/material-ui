/* eslint no-restricted-syntax: 0, prefer-template: 0, guard-for-in: 0
   ---
   These rules are preventing the performance optimizations below.
 */

export default function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  getUtilityClass: (slot: string) => string,
  classes: Record<string, string> | undefined = undefined,
): Record<ClassKey, string> {
  const output: Record<ClassKey, string> = {} as any;

  for (const slotName in slots) {
    const slot = slots[slotName];
    let buffer = '';
    let start = true;

    for (let i = 0; i < slot.length; i += 1) {
      const value = slot[i];
      if (value) {
        buffer += (start === true ? '' : ' ') + getUtilityClass(value);
        start = false;

        if (classes && classes[value]) {
          buffer += ' ' + classes[value];
        }
      }
    }

    output[slotName] = buffer;
  }

  return output;
}
