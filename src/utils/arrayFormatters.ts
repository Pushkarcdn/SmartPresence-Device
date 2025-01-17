/* eslint-disable @typescript-eslint/no-explicit-any */
export function rearrangeFields(data: any, fieldOrder: any) {
  return data.map((item: any) => {
    const rearrangedItem: any = {};
    fieldOrder.forEach((field: any) => {
      // Check if the field exists in the item and safely assign it
      if (Object.prototype.hasOwnProperty.call(item, field)) {
        rearrangedItem[field] = item[field];
      }
    });

    // Include any remaining fields that weren't in the specified order
    Object.keys(item).forEach((key) => {
      if (!rearrangedItem.hasOwnProperty(key)) {
        rearrangedItem[key] = item[key];
      }
    });

    return rearrangedItem;
  });
}
