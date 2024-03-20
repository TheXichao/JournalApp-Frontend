import { Entry} from "./JournalEntriesPage";


// quick sort algorithm that
export function sortEntriesByDate(entries: Array<Entry> | null, sortOrder: string): Entry[] {
    if (!entries) {
        return Array<Entry>();
    }
  return entries.sort((a, b) => {
    if (sortOrder === "desc") {
      return (
        new Date(b.creation_date).getTime() -
        new Date(a.creation_date).getTime()
      );
    } else {
      return (
        new Date(a.creation_date).getTime() -
        new Date(b.creation_date).getTime()
      );
    }
  });
}

// merge sort


// quick sort
