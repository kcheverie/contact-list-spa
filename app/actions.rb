# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  content_type :json
  @contacts = Contact.all
  @contacts.to_json
end

post '/contacts' do
  content_type :json
  @contact = Contact.new(
    name: params[:contact][:name],
    email: params[:contact][:email],
    phone: params[:contact][:phone]
    )

  if @contact.save
    @contact.to_json
  else
    @contact.errors.to_json
  end
end

get '/search' do
  content_type :json
  @contacts = Contact.where("name like ? OR email LIKE ?", "%#{params[:search_term]}%", "%#{params[:search_term]}%")
  @contacts.to_json
end