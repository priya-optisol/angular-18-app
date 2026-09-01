import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startRating',
  standalone: true
})
export class StartRatingPipe implements PipeTransform {

  transform(rating: number, maxStars: number = 5): string {
    if (!rating)
      return '☆☆☆☆☆';

    const roundedRating = Math.max(0, Math.min(Math.round(rating), maxStars));
    const filledStars = '★'.repeat(roundedRating);
    const emptyStars = '☆'.repeat( maxStars - roundedRating);
    return filledStars + emptyStars;

  }

}
