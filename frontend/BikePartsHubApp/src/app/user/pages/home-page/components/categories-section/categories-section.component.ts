import { Component } from '@angular/core';

interface Category {
  title: string;
  description: string;
  imageUrl: string;
  delay?: string;
}

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss'],
})
export class CategoriesSectionComponent {
  categories: Category[] = [
    {
      title: 'Parts',
      description:
        'Chains, sprockets, drive belts, and transmission components',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/coil%20pack.jpeg?alt=media&token=f4613d61-64cf-4b23-ac25-02f22dbea17f',
    },
    {
      title: 'Body Parts',
      description: 'Premium motorcycle body panels, fairings, and accessories',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/V3-left%20tank%20cover-black.jpg?alt=media&token=888c751c-2e1c-47ec-828a-00c83c7b8511',
      delay: 'delay-100',
    },
    {
      title: 'Engine Oil',
      description: 'High-quality synthetic and conventional motor oils',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2040%20castrol.jpeg?alt=media&token=3031c4a2-7ead-4951-9188-6edbee01e56a',
      delay: 'delay-200',
    },
  ];

  bottomCategories: Category[] = [
    {
      title: 'Brake Oil',
      description: 'DOT-approved brake fluids for optimal braking performance',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2049%20motul.jpeg?alt=media&token=f2a8f155-8d1c-48f6-8d6f-2872a50714ee',
      delay: 'delay-300',
    },
    {
      title: 'Lubricant Oil',
      description:
        'Specialized lubricants for chains, bearings, and moving parts',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2050%20servo.jpeg?alt=media&token=4d80efda-55df-47f8-96f7-377e1a2b1768',
      delay: 'delay-400',
    },
  ];
}
