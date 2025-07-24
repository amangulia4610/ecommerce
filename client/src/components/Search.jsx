import { TypeAnimation } from 'react-type-animation';
import { IoSearch } from 'react-icons/io5';
const Search = () => {
return (
    <div className="w-full">
        {/* Search Bar */}
        <div className="w-full md:max-w-md md:mx-auto">
            <div className="relative">
                <input
                    type="text"
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    <TypeAnimation
                        sequence={[
                            'Search for Fitness bands',
                            1000,
                            'Search for CGM',
                            1000,
                            'Search for Protein',
                            1000,
                        ]}
                        speed={50}
                        repeat={Infinity}
                    />
                </div>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black px-3 py-1 rounded-full hover:bg-blue-600 focus:outline-none">
                    <IoSearch size={20} />
                </button>
            </div>
        </div>
    </div>
)
}

export default Search;