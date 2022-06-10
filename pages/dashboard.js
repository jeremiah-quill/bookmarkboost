import { useBookmarks } from "../components/useBookmarks";
import BmList from "../components/BmList";

export default function DashboardPage() {
  const { data: bookmarks, error, mutate } = useBookmarks();

  // if(error) return <ErrorScreen />

  if (!bookmarks) return "Loading...";

  return (
    <div className="bg-blue-500 h-full">
      <BmList bookmarks={bookmarks} />
    </div>
  );
}
