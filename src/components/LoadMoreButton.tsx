import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onClick: () => void;
}

export function LoadMoreButton({
  hasNextPage,
  isFetchingNextPage,
  onClick,
}: LoadMoreButtonProps) {
  return (
    <div className="mt-12 flex justify-center">
      <Button
        variant="outline"
        onClick={onClick}
        disabled={!hasNextPage || isFetchingNextPage}
        className="gap-2 border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-900 hover:text-white"
      >
        {isFetchingNextPage ? (
          "Loading..."
        ) : hasNextPage ? (
          <>
            Load more movies <ChevronRight data-icon="inline-end" />
          </>
        ) : (
          "No more movies"
        )}
      </Button>
    </div>
  );
}
