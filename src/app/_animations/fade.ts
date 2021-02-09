import { trigger, state, style, transition, animate } from "@angular/animations";

export let fade = function (name: string, duration: number) {
  return trigger(name, [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      animate(duration)
    ])
  ])
}

export let slide = trigger('slide', [
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('500ms ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
  ])
]);
