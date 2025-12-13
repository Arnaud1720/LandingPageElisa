import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
  source: 'google' | 'trustpilot' | 'malt' | 'linkedin';
  date: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit {
  testimonialsVisible = false;

  // Avis clients fictifs Google My Business
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Claire Rousseau',
      role: 'Fondatrice',
      company: 'Cabinet de Coaching',
      rating: 5,
      comment: 'Grâce à son expertise sur Notion et Make, j\'ai gagné 10h par semaine ! Mon workflow est complètement automatisé et mes clients adorent le nouveau système de réservation. Un vrai game-changer pour mon activité.',
      source: 'google',
      date: 'Il y a 2 semaines'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      role: 'Directeur',
      company: 'E-commerce Mode',
      rating: 5,
      comment: 'Une assistante digitale au top ! Elle a créé tous mes visuels sur Canva, automatisé mes publications Instagram et organisé mon espace Notion. Réactivité exceptionnelle et résultats visibles immédiatement.',
      source: 'google',
      date: 'Il y a 1 mois'
    },
    {
      id: 3,
      name: 'Émilie Garnier',
      role: 'Consultante',
      company: 'Freelance Marketing',
      rating: 5,
      comment: 'J\'étais débordée avec ma gestion admin. Maintenant tout est fluide : facturation automatique, planning organisé, emails triés. Je peux enfin me concentrer sur mes clients. Je recommande à 100% !',
      source: 'google',
      date: 'Il y a 3 semaines'
    },
    {
      id: 4,
      name: 'Marc Lefebvre',
      role: 'CEO',
      company: 'Startup SaaS',
      rating: 5,
      comment: 'Son accompagnement sur Make a transformé notre productivité. Tous nos outils sont connectés, plus besoin de saisir les données 3 fois. Un ROI incroyable dès le premier mois !',
      source: 'google',
      date: 'Il y a 5 jours'
    }
  ];

  currentIndex = 0;
  autoplayInterval: any;

  ngOnInit() {
    this.checkVisibility();
    this.startAutoplay();
  }

  ngOnDestroy() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkVisibility();
  }

  private checkVisibility() {
    const element = document.getElementById('testimonials');
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      this.testimonialsVisible = rect.top < windowHeight * 0.75;
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000); // Change tous les 5 secondes
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  previousTestimonial() {
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }

  goToTestimonial(index: number) {
    this.currentIndex = index;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getSourceIcon(source: string): string {
    const icons: { [key: string]: string } = {
      google: '🔍',
      trustpilot: '⭐',
      malt: '💼',
      linkedin: '🔗'
    };
    return icons[source] || '⭐';
  }

  getSourceName(source: string): string {
    const names: { [key: string]: string } = {
      google: 'Google',
      trustpilot: 'Trustpilot',
      malt: 'Malt',
      linkedin: 'LinkedIn'
    };
    return names[source] || source;
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
