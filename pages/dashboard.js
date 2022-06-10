import { useBookmarks } from "../components/useBookmarks";
import BmList from "../components/BmList";
import LoadingCards from "../components/LoadingCards";

export default function DashboardPage() {
  const { data: bookmarks, error, mutate } = useBookmarks();

  // if(error) return <ErrorScreen />
  if (!bookmarks) return <LoadingCards />;

  return (
    <div className="h-full">
      <BmList bookmarks={bookmarks} />
    </div>
  );
}
