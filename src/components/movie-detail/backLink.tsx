import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 py-4 text-zinc-300 hover:text-white"
    >
      <ArrowLeft className="size-5" />
      <span>Back to home</span>
    </Link>
  );
}
