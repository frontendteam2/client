export default function Content(props) {
  return (
    <>
      <div className="mt-10 rounded-xl bg-stone-200">
        <div className="block flex text-center "><label htmlFor="" className="w-[30%] px-3 py-4 text-stone-900 text-sm">{props.txt}</label> <input type="text" placeholder="내용을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2" /></div>
      </div>
    </>
  );
}