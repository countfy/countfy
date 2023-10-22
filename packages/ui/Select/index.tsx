
function SelectItem({ opt, ...props }){

  return <option value={opt.value} {...props}>{opt.name}</option>

}

export function Select({options = false, ...props}){

  if(options.length == 0){
    options = [{value: '', name: 'loading...'}]
  }

  return (
    <select className={props.className + " block appearance-none text-left px-6 py-2 max-w-fit outline-none bg-transparent border-4 border-gray-600 text-white text-sm rounded-full"}>
      {
        options.map((opt, idx) => <SelectItem key={idx} opt={opt} className="bg-brand-black font-brand-white"/>)
      }
    </select>
  )
}
