import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent implements OnInit {
  processSteps = [
    {
      number: 1,
      title: 'Prise de contact & analyse',
      description: 'Échange pour comprendre vos besoins en productivité et organisation. Analyse de vos outils actuels.',
      icon: '💬',
      color: 'gold',
      visible: false,
      progress: 0
    },
    {
      number: 2,
      title: 'Proposition personnalisée',
      description: 'Recommandations sur les outils et automatisations adaptés à votre activité avec tarification transparente.',
      icon: '💡',
      color: 'gold',
      visible: false,
      progress: 0
    },
    {
      number: 3,
      title: 'Configuration & mise en place',
      description: 'Paramétrage de vos outils (Notion, Make, Canva...), création de workflows automatisés sur-mesure.',
      icon: '🔧',
      color: 'beige',
      visible: false,
      progress: 0
    },
    {
      number: 4,
      title: 'Formation & prise en main',
      description: 'Sessions de formation pour maîtriser vos nouveaux outils et processus d\'organisation.',
      icon: '📚',
      color: 'gold',
      visible: false,
      progress: 0
    },
    {
      number: 5,
      title: 'Accompagnement continu',
      description: 'Support quotidien, optimisations régulières et nouveautés pour maximiser votre productivité.',
      icon: '🌟',
      color: 'gold',
      visible: false,
      progress: 0
    }
  ];

  snakeProgress = 0;
  currentActiveStep = 0;

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const section = document.getElementById('process');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculer le pourcentage de visibilité de la section
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      // La section est visible
      const visiblePercentage = Math.min(
        Math.max((windowHeight - sectionTop) / (sectionHeight + windowHeight), 0),
        1
      );

      // Progression du serpent (0 à 100)
      this.snakeProgress = Math.min(visiblePercentage * 120, 100);

      // Activer les étapes progressivement
      const activeStepIndex = Math.floor((this.snakeProgress / 100) * this.processSteps.length);
      this.currentActiveStep = Math.min(activeStepIndex, this.processSteps.length - 1);

      // Mettre à jour la visibilité et progression de chaque étape
      this.processSteps.forEach((step, index) => {
        if (index <= this.currentActiveStep) {
          step.visible = true;
          step.progress = Math.min(((this.snakeProgress / 100) * this.processSteps.length - index) * 100, 100);
        }
      });
    }
  }

  getSnakePathProgress(): string {
    return `${this.snakeProgress}%`;
  }

  isStepActive(index: number): boolean {
    return index <= this.currentActiveStep;
  }

  getStepOpacity(index: number): number {
    if (!this.processSteps[index].visible) return 0;
    return Math.min(this.processSteps[index].progress / 50, 1);
  }
}
