import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  // listener on the document, so toggles on/off w/ away clicks
  //elRef class in constructor

  // @HostListener('click') toggleOpen() {
  // this.isOpen = !this.isOpen
  // toggles dropdown on element and not document, makes menu stay open even on away clicks

  constructor(private elRef: ElementRef) {}

}


