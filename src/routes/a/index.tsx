import { useMyContext } from "../a";

export default function Page() {
  const value = useMyContext();
  return <div>Page: {value.latest}</div>;
}
