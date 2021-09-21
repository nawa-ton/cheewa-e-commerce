import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Nawa',
            email: 'admin@cheewa.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'Witta',
            email: 'witta@polar.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        }
    ],
    products:[
        {
            name: 'Apple Jam',
            category: 'Jam',
            image: '/images/p1.jpg',
            weight: '250g',
            price: 12,
            countInStock: 20,
            rating: 4.5,
            numReviews: 10,
            description: 'Tangy and Sweet organic apple jam from local farm. Perfect for toast, yogurt, pancake'
        },
        {
            name: 'Red Current Jam',
            category: 'Jam',
            image: '/images/p2.jpg',
            weight: '250g',
            price: 16,
            countInStock: 15,
            rating: 4.6,
            numReviews: 12,
            description: 'Tangy organic red current jam from local farm. Perfect for toast, yogurt, pancake'
        },
        {
            name: 'Raspberry & Strawberry Jam',
            category: 'Jam',
            image: '/images/p3.jpg',
            weight: '360g (120g X 3)',
            price: 20,
            countInStock: 18,
            rating: 0,
            numReviews: 0,
            description: 'Tangy and Sweet organic raspberry and strawberry jam from local farm. Perfect for toast, yogurt, pancake'
        },
        {
            name: 'Prune Jam',
            category: 'Jam',
            image: '/images/p4.jpg',
            weight: '250g (50g X 5)',
            price: 13,
            countInStock: 5,
            rating: 5,
            numReviews: 20,
            description: 'Sweet organic prune jam from local farm. Perfect for toast, yogurt, pancake'
        },
        {
            name: 'Raspberry Jam',
            category: 'Jam',
            image: '/images/p5.jpg',
            weight: '300g (150g X 2)',
            price: 16,
            countInStock: 10,
            rating: 4.6,
            numReviews: 10,
            description: 'Tangy organic raspberry jam from local farm. Perfect for toast, yogurt, pancake'
        },
        {
            name: 'Strawberry Jam',
            category: 'Jam',
            image: '/images/p6.jpg',
            weight: '300g',
            price: 13,
            countInStock: 0,
            rating: 4.5,
            numReviews: 13,
            description: 'Organic strawberry jam from local farm. Perfect for toast, yogurt, pancake'
        },
        {
            name: 'Extra Virgin Olive Oil',
            category: 'Oil',
            image: '/images/p7.jpg',
            weight: '500ml',
            price: 20,
            countInStock: 18,
            rating: 4.4,
            numReviews: 24,
            description: 'Organic extra virgin olive oil from local farm. Perfect for salad dressing'
        },
        {
            name: 'Wild Flower Honey',
            category: 'Honey',
            image: '/images/p8.jpg',
            weight: '350g',
            price: 18,
            countInStock: 5,
            rating: 4.8,
            numReviews: 25,
            description: 'Organic wild flower honey from local farm. Perfect for everything'
        }
    ]
}

export default data;