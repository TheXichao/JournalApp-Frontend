import React from "react";
import { useParams } from "react-router-dom";

function EntryDetailPage() {
  const { id } = useParams();
  return <div>EntryDetailPage</div>;
}

export default EntryDetailPage;
