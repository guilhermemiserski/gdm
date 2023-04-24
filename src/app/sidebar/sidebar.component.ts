import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

interface Link {
  path: string;
  icon: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  links: Link[] = [
    { path: '/', icon: 'home', label: 'Home', active: false },
    { path: '/inserir-cliente', icon: 'person_add', label: 'Inserir cliente', active: false },
    { path: '/inserir-orcamento', icon: 'attach_money', label: 'Inserir orçamento', active: false },
    { path: '/orcamentos', icon: 'list', label: 'Orçamentos', active: false },
    { path: '/contas-receber', icon: 'payment', label: 'Pagamentos', active: false }
  ];
  activeLink: number;

  constructor(private router: Router, private sanitizer: DomSanitizer) { 
    this.activeLink = -1;
  }

  ngOnInit(): void {
    this.setActiveLink();
  }

  setActiveLink(): void {
    const currentPath = this.router.url;
    this.links.forEach((link, index) => {
      link.active = (link.path === currentPath || (link.path === '/' && currentPath === ''));
      if (link.active) {
        this.activeLink = index;
      }
    });
  }
}
