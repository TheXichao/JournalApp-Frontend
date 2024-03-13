import { Entry} from "./JournalEntriesPage";

export function sortEntriesByDate(entries: Entry[], sortOrder: string): Entry[] {
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
