import { Entry} from "./JournalEntriesPage";


export function sortEntriesByDate(entries: Entry[] | null, sortOrder: string): Entry[] {
  if (!entries) {
    return Array<Entry>();
  }
  // zipping the entries with their creation date
  const zippedEntries = entries.map((entry) => {
    return [entry, new Date(entry.creation_date).getTime()] as [Entry, number];
  })

  timSort(zippedEntries);

  // returns the sorted entries in unzipped format
  if (sortOrder === "desc") {
    return zippedEntries.map((zippedEntry) => zippedEntry[0]).reverse();
  }
  return zippedEntries.map((zippedEntry) => zippedEntry[0]);
}


function insertionSort<Key>(
  arr: Array<[Entry, Key]>,
  startIndex: number,
  endIndex: number,
) {
  for (let i = startIndex + 1; i < endIndex; i++) {
    let j = i;
    while (j > startIndex && arr[j - 1][1] > arr[j][1]) {
      swap(arr, j, j - 1);
      j--;
    }
  }
}

function swap<T>(arr: Array<[Entry, T]>, i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


function merge<Key>(arr: Array<[Entry, Key]>, left: number, mid: number, right: number) {
  const leftArr = arr.slice(left, mid);
  const rightArr = arr.slice(mid, right);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i][1] <= rightArr[j][1]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

function timSort<Key>(zippedEntries: Array<[Entry, Key]>){
  const RUN = 16;
  const n = zippedEntries.length;
  for (let i = 0; i < n; i += RUN) {
    insertionSort(zippedEntries, i, Math.min(i + RUN, n));
  }

  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size;
      const right = Math.min(left + 2 * size, n);
      merge(zippedEntries, left, mid, right);
    }
  }
}
