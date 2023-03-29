

  export function getItemBySize(size: string, arr:any) {
    let foundItem = null;
      arr.forEach((item: any) => {
        if (item.size.size === size) {
          foundItem = item;
        }
      });
  return foundItem;
  }