const Gallery = () => {
    
    const galleryImages = [
    { title: 'title', description: 'description', image: 'https://placehold.co/300x200/666/FFF?text=Gallery+1' },
    { title: 'title', description: 'description', image: 'https://placehold.co/300x200/666/FFF?text=Gallery+2' },
    { title: 'title', description: 'description', image: 'https://placehold.co/300x200/666/FFF?text=Gallery+3' },
    { title: 'title', description: 'description', image: 'https://placehold.co/300x200/666/FFF?text=Gallery+4' },
];
    
    return(
    <div className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
                <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-900">View More</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {galleryImages.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover"/>
                        <div className="p-4">
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)};

export default Gallery;