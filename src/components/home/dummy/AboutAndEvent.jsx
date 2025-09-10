const AboutAndEvents = () => {
const chairmanMessages = [
    {
        name: "Kwadoebeng Nkim",
        image: "https://placehold.co/150x200/EFEFEF/333?text=KN",
        message: "A short message refers to SMS (Short Message Service). It is a method of communication that sends text between mobile devices. It is a method of communication that uses cellular networks and doesn't require internet access."
    },
    {
        name: "Kwadoebeng Nkim",
        image: "https://placehold.co/150x200/EFEFEF/333?text=KN",
        message: "A short message refers to SMS (Short Message Service). It is a method of communication that sends text between mobile devices. It allows for messages up to 160 characters. It is a method of communication that uses cellular networks and doesn't require internet access."
    },
    {
        name: "Mustapha Nkim",
        image: "https://placehold.co/150x200/EFEFEF/333?text=MN",
        message: "A short message refers to SMS (Short Message Service). It is a method of communication that sends text between mobile devices. It allows for messages. It is a method of communication that uses cellular networks and doesn't require internet access."
    }
];

const eventDetails = {
    title: 'Title',
    date: '10-05-2025 - 09-10-2025',
    venue: 'Venue - University Hall',
    description: 'Description of event going ahead so that you can see what is happening to the event. A short message refers to SMS (Short Message Service).',
    participants: 120,
    image: 'https://placehold.co/400x200/333/FFF?text=Event+Image'
};
    
    
    return(
    <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* About Institute Section */}
            <div className="lg:col-span-2">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">About Institute</h2>
                    <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">View More</a>
                </div>
                <div className="space-y-8">
                    {chairmanMessages.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start bg-white p-6 rounded-lg border border-gray-200 gap-6">
                            <img src={item.image} alt={item.name} className="w-24 sm:w-32 h-auto rounded-md object-cover" />
                            <div>
                                <h4 className="font-bold text-lg mb-2">Chairman's Message</h4>
                                <p className="text-gray-600 text-sm mb-4">{item.message}</p>
                                <p className="font-semibold">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Events Section */}
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Events</h2>
                    <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">View More</a>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <img src={eventDetails.image} alt={eventDetails.title} className="w-full h-40 object-cover rounded-md mb-4"/>
                    <h3 className="font-bold text-xl mb-1">{eventDetails.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{eventDetails.date}</p>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{eventDetails.venue}</p>
                    <p className="text-sm text-gray-600 mb-4">{eventDetails.description}</p>
                    <p className="text-sm font-semibold mb-4">Participant - {eventDetails.participants}</p>
                    <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center text-gray-500">
                        Google map
                    </div>
                </div>
            </div>
        </div>
    </div>
)};

export default AboutAndEvents;
