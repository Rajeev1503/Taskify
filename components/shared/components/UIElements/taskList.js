import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import fetchHelper from "../../../../helpers/fetch-helper";
import { CurrentTaskListTypeContext } from "../../context/CurrentTaskListTypeContext";
import { TaskListContext } from "../../context/TaskListContext";
import PageMenu from "../display_layout/page-menu";
import Card from "./card";
import { NEXT_URL } from "../../../../config/index";
export default function TaskList(props) {
  const [taskLists, setTaskLists] = useState([]);
  const { data: session } = useSession();
  const currentTaskListType = useContext(CurrentTaskListTypeContext);

  useEffect(() => {
    // if(!session) {

    // }
    fetchHandler();
  }, [currentTaskListType?.currentTaskListType]);

  function fetchHandler() {
    fetchHelper(`/api/userId/tasklists`, "GET")
      .then((data) => {
        const allTaskLists = JSON.parse(data);
        return setTaskLists(allTaskLists);
      })
      .catch((err) => {
        console.log(err + ": error");
      });
  }

  const [addTaskListToggle, setAddTaskListToggle] = useState(false);
  const [moreFieldsToggle, setMoreFieldsToggle] = useState(false);

  return (
    <PageMenu>
      <div className="flex flex-col gap-2 pt-8 px-2" style={{ height: "100%" }}>
        <div className="">
          <button
            className="max-w-max bg-button-light p-1 px-2 rounded-lg text-center text-xs text-darktext font-semibold"
            onClick={() => {
              setAddTaskListToggle(!addTaskListToggle);
            }}
          >
            + Add New Task List
          </button>
          <div
            className={`bg-main-background ${addTaskListToggle?'':'hidden'} rounded-lg font-semibold text-xs mt-4 pt-2`}
          >
            <div className="flex flex-row gap-1">
              <input
                placeholder="TaskList Name"
                className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
              />
              <button className={`flex-grow ${moreFieldsToggle? 'hidden' : ''} bg-border-light rounded-lg text-darktext`}>
                Add TaskList
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="cursor-pointer" onClick={()=>{setMoreFieldsToggle(!moreFieldsToggle)}}>
                <p className="text-xxs text-gray-400 p-1 py-2" >
                  {moreFieldsToggle? <span>Hide extra fields</span> : <span>+ Add More fields</span>}
                </p>
              </div>
              <div className={`${moreFieldsToggle? '' : 'hidden'} flex flex-col gap-2`}>
                <input
                  placeholder="Description"
                  className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
                />
                <input
                  placeholder="Important Note"
                  className="flex-grow max-w-full rounded-lg p-1 bg-transparent border border-border-light"
                />
                <div className="flex flex-row gap-1 text-xs">
                  <input
                  placeholder="Custom Field"
                  className="flex-grow rounded-lg p-1 bg-transparent border border-border-light"
                />
                <button
            type=""
            className=" bg-button-light text-darktext p-1 rounded-lg flex-grow"
          >
            Add More
          </button>
                </div>
                
              </div>
              <div className={`${moreFieldsToggle? '' : 'hidden'} w-full flex flex-row gap-2 justify-center items-center text-xs text-center text-darktext`}>
          <button
            type="submit"
            className=" bg-button-light p-1 rounded-lg flex-grow"
          >
            Add TaskList
          </button>
          <button
            className="bg-button-light p-1 rounded-lg flex-grow"
            onClick={() => {
              setMoreFieldsToggle(!moreFieldsToggle);
            }}
          >
            Close
          </button>
        </div>
            </div>
          </div>
        </div>
        <div className="scrollbarfeature overflow-y-scroll flex justify-center items-center mt-8">
          <div className=" w-full" style={{ height: "100%" }}>
            <div className="grid grid-cols-1 gap-3 p-1">
              {taskLists.map((tasklist) => {
                return (
                  <div
                    className="cursor-pointer border border-border-dark rounded-lg"
                    key={tasklist._id}
                    onClick={() => {
                      props.renderTaskPage(tasklist);
                    }}
                  >
                    <div className="">
                      <Card>
                        <div className=" w-full flex flex-row flex-wrap gap-2 text-xs text-darktext font-semibold">
                          <span
                            className={`${
                              tasklist.isActive
                                ? "bg-red-500"
                                : "bg-border-notactive"
                            } text-white rounded-lg px-1 py-0.5 text-center `}
                          >
                            {tasklist.isActive ? (
                              <span className="">Active</span>
                            ) : (
                              <span className="bg-border-notactive">
                                Completed
                              </span>
                            )}
                          </span>
                          <span className="bg-border-light rounded-lg px-1 py-0.5 text-center">
                            imp
                          </span>
                          <span className="bg-border-light rounded-lg px-1 py-0.5 text-center">
                            urgent
                          </span>
                        </div>
                        <div className="w-full p-1 text-base font-semibold">
                          <p>{tasklist.taskListName}</p>
                          <p className="px-1 text-xs font-semibold text-sub-text-dark mt-3 text-center">
                            <span>Total Tasks: {tasklist.tasks.length}</span>{" "}
                            &nbsp;
                            <span>Completed: {tasklist.tasks.length}</span>
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
          </div>
        </div>
      </div>
    </PageMenu>
  );
}
