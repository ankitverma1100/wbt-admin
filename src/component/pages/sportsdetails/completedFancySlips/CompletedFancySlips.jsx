import { useNavigate } from 'react-router-dom';
import "./CompletedFancySlips.scss";
import CompeleteFancy from '../livereport/compeleteFancy/CompeleteFancy';


const CompletedFancySlips = () => {
  return (
    <>
      <div className="match_slip">
       <CompeleteFancy/>
      </div>
    </>
  )
}

export default CompletedFancySlips