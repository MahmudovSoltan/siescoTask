
import Users from '../../pages/users/Users'
import Tasks from '../../pages/tasks/Tasks'
const tabs = [
  {
    title: "Users",
    component: Users
  },
  {
    title: "Tasks",
    component: Tasks
  }
]
interface DashBoardBodyProps {
  currentTab: string;
}

const DashBoardBody = ({ currentTab }: DashBoardBodyProps) => {
  const current = tabs.find(tab => tab.title === currentTab);
  const CurrentComponent = current?.component;

  return (
    <div>
      {CurrentComponent && <CurrentComponent />}
    </div>
  )
}

export default DashBoardBody
