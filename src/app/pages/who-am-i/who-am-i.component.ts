/**
 * ============================================================================
 * Elilouche Assistante Digitale - Page Qui suis-je
 * ============================================================================
 *
 * @copyright 2025 nonodevco - Tous droits réservés
 * @author    nonodevco (https://nonodevco.com)
 * @license   Propriétaire - Reproduction et distribution interdites
 *
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-who-am-i',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './who-am-i.component.html',
  styleUrl: './who-am-i.component.css'
})
export class WhoAmIComponent {

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goBack(): void {
    this.scrollToSection('hero');
  }

  goToContact(): void {
    this.scrollToSection('contact');
  }

  goToBooking(): void {
    this.scrollToSection('booking');
  }
}
