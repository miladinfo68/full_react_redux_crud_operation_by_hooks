import ClickedTime from './ClickedTime';
import SwitchersButtons from "./SwitchersButtons";
import ResetButton from './ResetButton';

import { useSelector } from 'react-redux';

const Counter = () => {

  const {counter} = useSelector(state => state.counter);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column wrapperComponents">
      <ClickedTime />
      <h1>Counter No : {counter}</h1>
      <div className="d-flex justify-content-around">
        <SwitchersButtons />
        <ResetButton />
      </div>
    </div>
  )
}

export default Counter;