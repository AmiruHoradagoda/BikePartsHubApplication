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
      year: '2015',
      description: 'Founded as a small shop in Nikaweratiya.',
    },
    {
      year: '2018',
      description: 'Expanded to include comprehensive parts inventory.',
    },
    {
      year: '2020',
      description: 'Get autorized dealership in Associated Motorways (Private) Limited.',
    },
    {
      year: '2023',
      description: 'Recognized by Yamaha/AMW as the North Western Province highest-volume dealer in 2023',
    },
  
  ];

  team = [
   
    {
      name: 'Sarah Johnson',
      position: 'Technical Director',
      image: 'https://img.freepik.com/free-photo/experienced-businessman-standing-office-room-indian-content-office-employee-eyeglasses-smiling-posing-with-folded-hands-business-management-corporation-concept_74855-11681.jpg?t=st=1742222615~exp=1742226215~hmac=d1c52ca5d2f29fec1efe10d820ef6ca2aa99e710fafc37b5d20e20179400ef51&w=996',
      description: 'Master technician with multiple certifications',
    },
    {
      name: 'Chandima Sandamal',
      position: 'CEO & Founder',
      image: 'https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/463855837_8720652368023682_4474424505659490102_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UDQH4z534skQ7kNvwFdWb8n&_nc_oc=AdnQQTF8sGcgXVz44VoikzxMab_FWyoB8BNVHKdn1I-sUHiy1pT__DSCLZrC5VSS7UMQ9jQjHp72cam7dCuYz1YN&_nc_zt=23&_nc_ht=scontent.fcmb1-2.fna&_nc_gid=2VmTk25XjDpC27cuYTv6bw&oh=00_AfKewgOlDmmnHkuQN4C_nnpE-JCcaD0ESFpmsHZIoQXZyQ&oe=68224423',
      description: '10+ years of industry experience',
    },
    {
      name: 'Michael Chen',
      position: 'Operations Manager',
      image: 'https://img.freepik.com/free-photo/experienced-businessman-standing-office-room-indian-content-office-employee-eyeglasses-smiling-posing-with-folded-hands-business-management-corporation-concept_74855-11681.jpg?t=st=1742222615~exp=1742226215~hmac=d1c52ca5d2f29fec1efe10d820ef6ca2aa99e710fafc37b5d20e20179400ef51&w=996',
      description: 'Expert in supply chain and logistics',
    },
  ];
}
