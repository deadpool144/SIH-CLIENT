const AlumniSpotlight = () => {

    const alumniSpotlightData = [
  {
    name: 'Dr. Miracle Kpadonou',
    title: 'SDE 1, Microsoft',
    description: 'Small description from the original text. 3-4 lines max and small.',
    avatar: 'https://placehold.co/100x100/EFEFEF/333?text=Dr.M',
  },
  {
    name: 'Dr. Elouise Syvdatne',
    title: 'SDE 1, Microsoft',
    description: 'Small description from the original text. 3-4 lines max and small.',
    avatar: 'https://placehold.co/100x100/EFEFEF/333?text=Dr.E',
  },
  {
    name: 'Dr. Miracle Kpadonou',
    title: 'SDE 1, Microsoft',
    description: 'Small description from the original text. 3-4 lines max and small.',
    avatar: 'https://placehold.co/100x100/EFEFEF/333?text=Dr.M',
  },
];

return(
    <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Alumni Spotlight</h2>
                <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">View More</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {alumniSpotlightData.map((alumnus, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                        <img src={alumnus.avatar} alt={alumnus.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <h3 className="font-bold text-lg">{alumnus.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{alumnus.title}</p>
                        <p className="text-sm text-gray-600">{alumnus.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)};
export default AlumniSpotlight;