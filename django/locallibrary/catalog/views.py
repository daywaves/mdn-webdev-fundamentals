from django.shortcuts import render
from django.views import generic
from .models import Book, Author, BookInstance, Genre


# Create your views here.
def index(request):
    """
    View function for home page of site.
    """
    # Generate counts of some of the main objects
    num_books = Book.objects.all().count()
    num_instances = BookInstance.objects.all().count()
    # Available books (status = 'a')
    num_instances_available = BookInstance.objects.filter(
        status__exact='a').count()
    num_authors = Author.objects.count()  # The 'all()' is implied by default.
    num_genres = Genre.objects.count()
    num_the_books = Book.objects.filter(title__icontains='the').count()

    num_visits = request.session.get('num_visits', 0)
    request.session['num_visits'] = num_visits + 1

    # Render the HTML template index.html with the data in the context variable
    return render(
        request,
        'index.html',
        context={'num_books': num_books, 'num_instances': num_instances,
                 'num_instances_available': num_instances_available, 'num_authors': num_authors,
                 'num_genres': num_genres, 'num_the_books': num_the_books, 'num_visits': num_visits},
    )


class BookListView(generic.ListView):
    model = Book
    queryset = Book.objects.order_by('title')
    paginate_by = 10


class BookDetailView(generic.DetailView):
    model = Book


class AuthorListView(generic.ListView):
    model = Author
    queryset = Author.objects.order_by('last_name')
    paginate_by = 10


class AuthorDetailView(generic.DetailView):
    model = Author
