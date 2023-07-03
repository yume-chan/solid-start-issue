import {
  Accessor,
  createContext,
  createSignal,
  onMount,
  useContext
} from "solid-js";
import { Outlet } from "solid-start";

const MyContext = createContext<Accessor<string>>();

export function useMyContext() {
  const value = useContext(MyContext);
  if (!value) {
    throw new Error("MyContext not found");
  }
  return value;
}

function Child(props: { value: Accessor<string> }) {
  return <div>Child: {props.value()}</div>;
}

export default function Layout() {
  const [value, setValue] = createSignal("initial");

  onMount(() => {
    setValue("mutate");
  });

  return (
    <MyContext.Provider value={value}>
      <div>
        <button onClick={() => setValue("click")}>Mutate Again</button>
      </div>
      <div>Layout: {value()}</div>
      <Child value={value} />
      <Outlet />
    </MyContext.Provider>
  );
}
