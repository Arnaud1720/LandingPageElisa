import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  skills = [
    { name: 'Notion', category: 'organisation', icon: '📝' },
    { name: 'Google Workspace', category: 'organisation', icon: '📧' },
    { name: 'Trello', category: 'organisation', icon: '📋' },
    { name: 'Asana', category: 'organisation', icon: '✅' },
    { name: 'ClickUp', category: 'organisation', icon: '🎯' },
    { name: 'Monday.com', category: 'organisation', icon: '📊' },
    { name: 'Make (Integromat)', category: 'automatisation', icon: '⚡' },
    { name: 'Zapier', category: 'automatisation', icon: '🔗' },
    { name: 'n8n', category: 'automatisation', icon: '🤖' },
    { name: 'Airtable', category: 'automatisation', icon: '🗃️' },
    { name: 'Canva Pro', category: 'design', icon: '🎨' },
    { name: 'Figma', category: 'design', icon: '✏️' },
    { name: 'Adobe Express', category: 'design', icon: '🖼️' },
    { name: 'Meta Business Suite', category: 'social', icon: '📱' },
    { name: 'Buffer', category: 'social', icon: '📅' },
    { name: 'Later', category: 'social', icon: '⏰' },
    { name: 'Hootsuite', category: 'social', icon: '🦉' },
    { name: 'Slack', category: 'communication', icon: '💬' },
    { name: 'Microsoft Teams', category: 'communication', icon: '👥' },
    { name: 'Discord', category: 'communication', icon: '🎮' },
    { name: 'Zoom', category: 'communication', icon: '🎥' }
  ];

  getSkillsByCategory(category: string) {
    return this.skills.filter(skill => skill.category === category);
  }
}
