from django.utils import timezone
from django import forms
from django.contrib.auth import get_user_model
from .models import UserProfile
# from allauth.account.forms import SignupForm, LoginForm
from .utils import (
    json_serial, photo_url_filter,
    upload_status_image,
)


class UserProfileSignupForm(SignupForm):
    # account_id = forms.CharField(max_length=50, label='User ID', help_text='User ID', required=True)
    GENDER = (
        ('Female','Female'),
        ('Male', 'Male'),
        ('Unspecified', 'Unspecified')
    )
    first_name = forms.CharField(max_length=50, label='First Name', required=True)
    last_name = forms.CharField(max_length=50, label='Last Name', required=True)
    middle_name = forms.CharField(max_length=50, label='Middle Name', help_text="Not Required", required=False)
    gender = forms.ChoiceField(label='Gender', choices=GENDER, widget=forms.RadioSelect, required=True)
    # date_of_birth = forms.DateField(widget=forms.SelectDateWidget(years=range(1940, 2004)), required=True)
    date_of_birth = forms.DateField(widget=forms.DateTimeInput(attrs={
            'class': 'form-control datetimepicker-input',
            'data-target': '#id_date_of_birth',
            'type':'date'}))

    phone_number = forms.CharField(max_length=50, label='Phone number', required=True)
    photo = forms.ImageField(label='Passports', help_text="Passport photograph", required=True)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password1', 'password2',
            'date_of_birth', 'gender',
            'phone_number', 'photo',
            )

    def save(self, request):

        # Ensure you call the parent class's save.
        # .save() returns a User object.
        # print(self, request.POST)
        post = request.POST
        print(request.FILES)
        p = request.POST.get('password1')
        user = super(UserProfileSignupForm, self).save(request)
        user.date_of_birth = post.get('date_of_birth')
        user.phone_number = post.get('phone_number')
        user.photo = request.FILES.get('photo')
        user.gender = post.get('gender')
        user.save()
        # Add your own processing here.

        # You must return the original result.
        return user
