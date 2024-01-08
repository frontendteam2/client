import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useMaxWidth } from "../../util/useMaxWidth";

export default function Content(props) {
  const dispatch = useDispatch();
  const width = useMaxWidth();

  return (
    <div className=" mt-12">
      <div className="text-sm text-stone-900 font-semibold flex"><span>{props.category}</span><button type="button" onClick={(e)=> dispatch({ type: 'close', num: props.num })}  className="ml-5"><IoClose /></button></div>
      <div className="mt-5 rounded-xl bg-stone-100">
        <div className="block  text-center ">
          <textarea type="text" name={`content`} maxLength='500' placeholder="내용을 입력해주세요." className={`${width ? 'h-40' : 'h-20'}  resize-none overflow-auto rounded-xl  text-sm py-4 block w-[100%] bg-stone-50 px-2`} />
        </div> 
      </div>
    </div>
  );
}