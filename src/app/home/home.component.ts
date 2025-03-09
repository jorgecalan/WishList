import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChildren('productTitle') productTitles!: QueryList<ElementRef>;

  products = [
    { 
      name: 'Aloe Vera', 
      imageUrl: 'assets/ImgProd/AloeVera1.jpg', 
      price: 'Q3.50', 
      description: 'Bebida refrescante y saludable con Aloe Vera.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Baguette', 
      imageUrl: 'assets/ImgProd/Baguette1.jpg', 
      price: 'Q12.00', 
      description: 'Pan crujiente y delicioso para acompañar tus comidas.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Whisky Black Label', 
      imageUrl: 'assets/ImgProd/BlackLabel2.jpg', 
      price: 'Q250.00', 
      description: 'Whisky de alta calidad para ocasiones especiales.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Whisky Blue Label', 
      imageUrl: 'assets/ImgProd/BlueLabel2.jpg', 
      price: 'Q800.00', 
      description: 'La mejor expresión del whisky escocés premium.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Carne Molida', 
      imageUrl: 'assets/ImgProd/CarneMolida1.png', 
      price: 'Q45.00', 
      description: 'Carne molida fresca ideal para preparar hamburguesas y más.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Carne Seca', 
      imageUrl: 'assets/ImgProd/CarneSeca1.jpg', 
      price: 'Q10.50', 
      description: 'El mejor snack proteico para cualquier momento del día.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Carne para Asados', 
      imageUrl: 'assets/ImgProd/CarnesAsados2.jpg', 
      price: 'Q75.00', 
      description: 'Cortes seleccionados perfectos para parrilladas.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Cebollas', 
      imageUrl: 'assets/ImgProd/Cebollas2.jpg', 
      price: 'Q8.00', 
      description: 'Cebollas frescas para darle sabor a tus comidas.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Coca-Cola Zero', 
      imageUrl: 'assets/ImgProd/CocaZero1.jpg', 
      price: 'Q5.75', 
      description: 'El refresco sin azúcar para disfrutar sin culpa.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Pan Francés', 
      imageUrl: 'assets/ImgProd/Frances1.jpg', 
      price: 'Q6.00', 
      description: 'Pan suave y esponjoso con el auténtico sabor francés.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Gatorade', 
      imageUrl: 'assets/ImgProd/Gatorage1.jpg', 
      price: 'Q7.50', 
      description: 'Bebida isotónica para mantenerte hidratado y con energía.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Jamón Ahumado', 
      imageUrl: 'assets/ImgProd/JamonAhumado1.jpg', 
      price: 'Q30.00', 
      description: 'Jamón con un delicioso toque ahumado, ideal para sándwiches.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Jugo Natural', 
      imageUrl: 'assets/ImgProd/JugoGranja1.jpg', 
      price: 'Q15.00', 
      description: 'Jugo natural elaborado con frutas frescas.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Cerveza Modelo', 
      imageUrl: 'assets/ImgProd/Modelo1.jpg', 
      price: 'Q12.00', 
      description: 'Cerveza premium con un sabor inigualable.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Pan de Concha', 
      imageUrl: 'assets/ImgProd/PanConcha1.jpg', 
      price: 'Q4.00', 
      description: 'Pan dulce tradicional con cobertura crujiente.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Pastel de Zanahoria', 
      imageUrl: 'assets/ImgProd/PastelZanahoria1.jpg', 
      price: 'Q35.00', 
      description: 'Delicioso pastel de zanahoria con cobertura de queso crema.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Red Bull', 
      imageUrl: 'assets/ImgProd/RedBull1.jpg', 
      price: 'Q10.00', 
      description: 'Bebida energética para mantenerte activo y enfocado.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Salchichas', 
      imageUrl: 'assets/ImgProd/Salchichas1.jpg', 
      price: 'Q25.00', 
      description: 'Salchichas premium para hot dogs o parrillas.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Suero Oral', 
      imageUrl: 'assets/ImgProd/Suero1.jpg', 
      price: 'Q5.00', 
      description: 'Hidratación rápida y efectiva para recuperar energías.',
      rating: 0,  
      comment: ''  
    },
    { 
      name: 'Tacos', 
      imageUrl: 'assets/ImgProd/Tacos1.jpg', 
      price: 'Q50.00', 
      description: 'Auténticos tacos con el mejor sabor casero.' ,
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Tortillas de Harina', 
      imageUrl: 'assets/ImgProd/TortillaHarina1.jpg', 
      price: 'Q10.00', 
      description: 'Tortillas suaves y flexibles para preparar burritos y wraps.',
      rating: 0,  
      comment: '' 
    },
    { 
      name: 'Zanahorias', 
      imageUrl: 'assets/ImgProd/Zanahoria1.jpg', 
      price: 'Q5.00', 
      description: 'Zanahorias frescas y nutritivas para ensaladas y guisos.',
      rating: 0,  
      comment: '' 
    }
];


  searchQueries: string[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchQueries = this.productTitles.map(title => title.nativeElement.innerText.trim());
    });
  }

  getGoogleSearchUrl(index: number): string {
    return `https://www.google.com/search?q=${encodeURIComponent(this.searchQueries[index] || '')}`;
  }
  submitReview(product: any) {
    console.log(`Review enviada para ${product.name}:`, {
      rating: product.rating,
      comment: product.comment
    });
    alert('Reseña enviada con éxito');
  }
  rateProduct(product: any, rating: number) {
    product.rating = rating;
  }
}






