import {
  InitializedResource,
  createContext,
  createResource,
  onMount,
  useContext,
} from "solid-js";
import { Outlet } from "solid-start";

const MyContext = createContext<InitializedResource<string>>();

export function useMyContext() {
  const value = useContext(MyContext);
  if (!value) {
    throw new Error("MyContext not found");
  }
  return value;
}

function Child(props: { value: InitializedResource<string> }) {
  return <div>Child: {props.value.latest}</div>;
}

export default function Layout() {
  const [value, { mutate }] = createResource(
    () => { },
    () => "fetcher",
    { initialValue: "initial" }
  );

  onMount(() => {
    mutate("mutate");
  });

  return (
    <MyContext.Provider value={value}>
      <div>Layout: {value.latest}</div>
      <Child value={value} />
      <Outlet />
    </MyContext.Provider>
  );
}
