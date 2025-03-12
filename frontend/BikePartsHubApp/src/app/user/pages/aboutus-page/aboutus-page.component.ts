import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus-page.component.html',
  styleUrl: './aboutus-page.component.css',
})
export class AboutusPageComponent {
  features = [
    {
      icon: 'shield',
      title: 'Quality Guarantee',
      description: 'Only genuine parts and professional service guaranteed.',
    },
    {
      icon: 'clock',
      title: 'Fast Service',
      description: 'Quick turnaround time without compromising quality.',
    },
    {
      icon: 'award',
      title: 'Expert Team',
      description: 'Certified technicians with years of experience.',
    },
    {
      icon: 'users',
      title: 'Customer Focus',
      description: 'Dedicated to exceeding customer expectations.',
    },
  ];

  milestones = [
    {
      year: '2010',
      description: 'Founded as a small repair shop in Colombo.',
    },
    {
      year: '2015',
      description: 'Expanded to include comprehensive parts inventory.',
    },
    {
      year: '2018',
      description: 'Opened second location and launched online store.',
    },
    {
      year: '2020',
      description: 'Achieved ISO certification for service quality.',
    },
    {
      year: '2023',
      description: "Became Sri Lanka's largest motorcycle parts retailer.",
    },
  ];

  team = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      image: '/api/placeholder/400/400',
      description: '20+ years of industry experience',
    },
    {
      name: 'Sarah Johnson',
      position: 'Technical Director',
      image: '/api/placeholder/400/400',
      description: 'Master technician with multiple certifications',
    },
    {
      name: 'Michael Chen',
      position: 'Operations Manager',
      image: '/api/placeholder/400/400',
      description: 'Expert in supply chain and logistics',
    },
  ];
}
