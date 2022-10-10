import Category from '../models/category';
import Product from '../models/product';
import Amount from '../models/amount';
import Record from '../models/record';
export const AMOUNT = [
  new Amount('1','0')
];

export const RECORD = [
  new Record('1', '02-2021', '0')
]

export const CATEGORIES = [
  new Category('c1', 'Education', '#4f3b78', '0'),
  new Category('c2', 'Sports', '#045757', '0'),
  new Category('c3', 'Party', '#834c69', '0'),
  new Category('c6', 'Rent', '#1d3e53', '0'),
  new Category('c7', 'Transport', '#393e6f', '0'),
  new Category('c8', 'Health', '#3e432e', '0'),
  new Category('c4', 'Girlfriend', '#602080', '0'),
  new Category('c5', 'Grocery', '#413d65', '0')
];

export const PRODUCTS = [
  new Product(
    'm1',
    'c1',
    'Red Shirt',
    'A red t-shirt, perfect for days with non-red weather.',
    '30',
    '10-21-2020'
  ),
  new Product(
    'm2',
    'c2',
    'Blue Carpet',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    '100',
    '10-21-2020'
  ),
  new Product(
    'm8',
    'c8',
    'Coffee Mug',
    'Can also be used for tea!',
    '10',
    '10-21-2020'
  ),
  new Product(
    'm10',
    'c2',
    'The Book - Limited Edition',
    "What the content is? Why would that matter? It's a limited edition!",
    '20',
    '10-21-2020'
  ),
  new Product(
    'm7',
    'c7',
    'PowerBook',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    '2300',
    '10-21-2020'
  ),
  new Product(
    'm6',
    'c6',
    'Pen & Paper',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    '10',
    '10-21-2020'
  ),
  new Product(
    'm5',
    'c3',
    'Pen & Paper',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    '10',
    '10-21-2020'
  )
];