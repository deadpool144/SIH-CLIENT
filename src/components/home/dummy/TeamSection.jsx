const TeamSection = () => {

    const teamMembers = [
    { name: 'Dr. Chibueze Ugo', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CU' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Miracle Kpadonou', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=MK'},
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
    { name: 'Dr. Chibugo Lynda', avatar: 'https://placehold.co/80x80/EFEFEF/333?text=CL' },
];


    return(
     <div className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="text-center">
                        <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
                        <p className="font-semibold text-sm">{member.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)};

export default TeamSection;