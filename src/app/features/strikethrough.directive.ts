import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStrikethrough]',
  standalone: true
})
export class StrikethroughDirective implements OnInit{

  constructor(private el:ElementRef, private renderer:Renderer2) { }
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement,'text-decoration','line-through');
    // this.renderer.setStyle(this.el.nativeElement,'color','#fff');
  }

}
