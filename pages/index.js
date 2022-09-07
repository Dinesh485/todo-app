import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: item,
      completed: false,
    };
    setItems(state => {
      return [...state, newItem];
    });
    setItem("");
  };
  const handleComplete = id => {
    let newItems = [...items];
    newItems.forEach(item => {
      if (item.id === id) {
        item.completed = true;
        return item;
      } else {
        return item;
      }
    });
    setItems(newItems);
  };
  const handleDelete = id => {
    const newItems = [...items].filter(item => {
      return id !== item.id;
    });

    setItems(newItems);
  };

  return (
    <div className="container flex h-screen min-h-[500px] max-h-screen flex-col gap-4 p-4 mx-auto lg:gap-6">
      <h1 className="w-full text-center text-4xl font-bold capitalize">todo</h1>
      <div className="bg-gray-200 rounded-lg border border-gray-300">
        <h2 className="p-4 text-lg font-medium border-b border-gray-300">Add a task</h2>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
          className="bg-white p-4 flex flex-col gap-3 items-start lg:gap-5 rounded-b-lg"
        >
          <label htmlFor="item" className="text-lg font-medium">
            Item
          </label>
          <div className="w-full">
            <input
              onChange={e => setItem(e.target.value)}
              value={item}
              type="text"
              id="item"
              className="block p-2 mb-1 border w-full border-gray-400 rounded focus:outline-none"
              placeholder="What do you want to do"
              required
            />
            <p className="text-gray-500 text-sm">Enter what you want to procastinate</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-3 rounded">Submit</button>
        </form>
      </div>
      <div className="bg-gray-200 rounded-lg border border-gray-300 min-h-0 flex flex-col flex-grow">
        <h2 className="p-4 text-lg font-medium border-b border-gray-300">Tasks</h2>
        <div className="bg-white p-4 sm:p-6  items-start flex-grow min-h-0 rounded-b-lg ">
          {items.length > 0 ? (
            <div className="flex flex-col gap-4 h-full min-h-0 lg:gap-6">
              <div className="grid grid-cols-3 justify-between w-full items-center font-bold md:text-lg capitalize">
                <div className="overflow-hidden">Name</div>
                <div className="overflow-hidden">status</div>
                <div className="overflow-hidden">action</div>
              </div>
             <div className="min-h-0 flex flex-col flex-grow overflow-y-auto gap-4  lg:gap-6">
             {
                items.map(item => {
                  return (
                    <div key={item.id} className="grid grid-cols-3 w-full items-center text-sm md:text-base gap-2">
                      <div className="overflow-hidden font-medium">{item.name}</div>
                      <div className="overflow-hidden font-medium capitalize">{item.completed ? "completed" : "not completed"}</div>
                      <div className="flex gap-1 flex-wrap ">
                        <button onClick={() => handleComplete(item.id)} className="bg-blue-600 text-white py-1 px-3 rounded sm:py-2">
                          Complete
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white py-1 px-3 rounded sm:py-2 ">
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
             </div>
            </div>
          ): <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-2xl">Nothing to show</div>}
        </div>
      </div>
    </div>
  );
}
