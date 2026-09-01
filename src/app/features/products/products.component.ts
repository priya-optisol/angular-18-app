import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductResponse } from '../product.model';
import { DecimalPipe } from '@angular/common'; 
import {StartRatingPipe} from '../start-rating.pipe';
import { StrikethroughDirective } from '../strikethrough.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DecimalPipe,StartRatingPipe,StrikethroughDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductsService);
  products: Signal<ProductResponse | undefined> = toSignal(this.productService.getProducts());
  productsWithSavings = computed(() => {
    const list = this.products();
    if (!list) return []; // Return an empty array while loading

    return list.products.map(prod => ({
      ...prod,
      savings: (prod.price * prod.discountPercentage) / 100,
      finalPrice: prod.price - (prod.price * prod.discountPercentage) / 100
    }));
  });
  constructor() {

  }

  ngOnInit() {
  }
}
