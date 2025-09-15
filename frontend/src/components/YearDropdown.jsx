import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown, FaCheck } from "react-icons/fa6";

function YearDropdown({ years, selectedYear, setSelectedYear }) {
	return (
		<div className="w-32">
			<Listbox value={selectedYear} onChange={setSelectedYear}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500">
						<span className="block truncate">{selectedYear}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
							{years.map((year) => (
								<Listbox.Option
									key={year}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"}`
									}
									value={year}>
									{({ selected }) => (
										<>
											<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{year}</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
													<FaCheck className="h-4 w-4" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}

export default YearDropdown;
