import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Loader2,
  User,
  AtSign,
  PhoneCall,
  MessageSquare,
  Check,
  X
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Reset formSubmitted status after some time
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formSubmitted) {
      timeout = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [formSubmitted]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      console.log('Enviando formulário para o servidor:', data);
      try {
        const response = await apiRequest("POST", "/api/contact", data);
        console.log('Resposta do servidor:', response);
        const result = await response.json();
        console.log('Dados da resposta:', result);
        return result;
      } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Formulário enviado com sucesso:', data);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      form.reset();
      setFormSubmitted(true);
    },
    onError: (error) => {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log('Formulário submetido:', data);
    contactMutation.mutate(data);
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-lightgray/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <span className="text-primary font-semibold bg-blue-100 px-4 py-1 rounded-full text-sm mb-4 inline-block">FALE CONOSCO</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-darkgray">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender sua empresa e fornecer os melhores produtos para o seu negócio.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
            {formSubmitted ? (
              <div className="bg-white rounded-xl p-10 shadow-lg border border-green-100">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat mb-4 text-darkgray">
                    Mensagem Enviada com Sucesso!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Obrigado por entrar em contato. Nossa equipe responderá sua mensagem em breve.
                  </p>
                  <Button 
                    type="button" 
                    onClick={() => setFormSubmitted(false)}
                    className="bg-primary hover:bg-darkblue text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Enviar Nova Mensagem
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold font-montserrat mb-6 text-darkgray flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6 text-primary" />
                  Envie uma mensagem
                </h3>
                <p className="text-gray-600 mb-6">
                  Preencha o formulário abaixo para solicitar orçamentos, tirar dúvidas ou conhecer mais sobre nossos produtos.
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <User className="mr-1.5 h-4 w-4 text-primary" />
                              Nome completo*
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  placeholder="Seu nome" 
                                  {...field}
                                  className={cn(
                                    "border-gray-300 focus:border-primary focus:ring-primary/20 pr-10",
                                    field.value && field.value.length >= 3 ? "border-green-500 focus:border-green-500 focus:ring-green-200" : "",
                                    field.value && field.value.length > 0 && field.value.length < 3 ? "border-amber-500 focus:border-amber-500 focus:ring-amber-200" : ""
                                  )}
                                  onFocus={(e) => {
                                    if (field.value.length === 0) {
                                      e.target.classList.add("animate-pulse-border");
                                      setTimeout(() => e.target.classList.remove("animate-pulse-border"), 600);
                                    }
                                  }}
                                />
                              </FormControl>
                              {field.value && field.value.length > 0 && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300">
                                  {field.value.length >= 3 ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-amber-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                          // Função para verificar se o email parece válido
                          const isValidEmail = (email: string) => {
                            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                          };
                          
                          return (
                            <FormItem>
                              <FormLabel className="flex items-center">
                                <AtSign className="mr-1.5 h-4 w-4 text-primary" />
                                E-mail*
                              </FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="seu@email.com.br" 
                                    type="email" 
                                    {...field} 
                                    className={cn(
                                      "border-gray-300 focus:border-primary focus:ring-primary/20 pr-10",
                                      field.value && isValidEmail(field.value) ? "border-green-500 focus:border-green-500 focus:ring-green-200" : "",
                                      field.value && field.value.length > 0 && !isValidEmail(field.value) ? "border-amber-500 focus:border-amber-500 focus:ring-amber-200" : ""
                                    )}
                                    onFocus={(e) => {
                                      if (field.value.length === 0) {
                                        e.target.classList.add("animate-pulse-border");
                                        setTimeout(() => e.target.classList.remove("animate-pulse-border"), 600);
                                      }
                                    }}
                                  />
                                </FormControl>
                                {field.value && field.value.length > 0 && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300">
                                    {isValidEmail(field.value) ? (
                                      <Check className="h-5 w-5 text-green-500" />
                                    ) : (
                                      <X className="h-5 w-5 text-amber-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => {
                        // Função para limpar e verificar números de telefone
                        const cleanPhone = (phone: string) => phone.replace(/\D/g, '');
                        const isValidPhone = (phone: string) => cleanPhone(phone).length >= 10;
                        
                        return (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <PhoneCall className="mr-1.5 h-4 w-4 text-primary" />
                              Telefone*
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  placeholder="(11) 98765-4321" 
                                  {...field}
                                  className={cn(
                                    "border-gray-300 focus:border-primary focus:ring-primary/20 pr-10",
                                    field.value && isValidPhone(field.value) ? "border-green-500 focus:border-green-500 focus:ring-green-200" : "",
                                    field.value && field.value.length > 0 && !isValidPhone(field.value) ? "border-amber-500 focus:border-amber-500 focus:ring-amber-200" : ""
                                  )}
                                  onFocus={(e) => {
                                    if (field.value.length === 0) {
                                      e.target.classList.add("animate-pulse-border");
                                      setTimeout(() => e.target.classList.remove("animate-pulse-border"), 600);
                                    }
                                  }}
                                  onChange={(e) => {
                                    // Formatação automática do telefone
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length > 0) {
                                      // Formata como (XX) XXXXX-XXXX
                                      if (value.length <= 2) {
                                        value = `(${value}`;
                                      } else if (value.length <= 7) {
                                        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                                      } else {
                                        value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                                      }
                                    }
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              {field.value && field.value.length > 0 && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300">
                                  {isValidPhone(field.value) ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-amber-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <FormDescription className="text-xs text-gray-500">
                              Formato recomendado: (DDD) XXXXX-XXXX
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MessageSquare className="mr-1.5 h-4 w-4 text-primary" />
                            Mensagem*
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Textarea 
                                placeholder="Digite sua mensagem aqui..." 
                                className={cn(
                                  "resize-none min-h-[120px] border-gray-300 focus:border-primary focus:ring-primary/20 pr-10",
                                  field.value && field.value.length >= 10 ? "border-green-500 focus:border-green-500 focus:ring-green-200" : "",
                                  field.value && field.value.length > 0 && field.value.length < 10 ? "border-amber-500 focus:border-amber-500 focus:ring-amber-200" : ""
                                )}
                                rows={5}
                                {...field} 
                                onFocus={(e) => {
                                  if (field.value.length === 0) {
                                    e.target.classList.add("animate-pulse-border");
                                    setTimeout(() => e.target.classList.remove("animate-pulse-border"), 600);
                                  }
                                }}
                              />
                            </FormControl>
                            {field.value && field.value.length > 0 && (
                              <div className="absolute right-3 top-6 transition-all duration-300">
                                {field.value.length >= 10 ? (
                                  <Check className="h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="h-5 w-5 text-amber-500" />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between mt-1">
                            <FormMessage />
                            <div className={cn(
                              "text-xs transition-all duration-300",
                              field.value.length < 10 ? "text-amber-500" : "text-green-500"
                            )}>
                              {field.value.length}/10 caracteres mínimos
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-darkblue text-white font-medium py-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        disabled={contactMutation.isPending}
                        size="lg"
                      >
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Enviar mensagem
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Seus dados estão seguros conosco e não serão compartilhados com terceiros.
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/2" data-aos="fade-left" data-aos-duration="1000">
            <div className="bg-primary rounded-xl p-8 shadow-lg text-white mb-8 relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 0H0V100H100V0Z" fill="white"/>
                  <path d="M92 8H8V92H92V8Z" fill="white"/>
                  <path d="M83 17H17V83H83V17Z" fill="white"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold font-montserrat mb-8 relative">
                Informações de contato
                <div className="absolute bottom-0 left-0 h-1 w-16 bg-white mt-2 rounded-full"></div>
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Endereço</h4>
                    <p className="text-white/90">
                      Rua Senador Flaquer 916 - Centro<br />
                      Santo André - SP (Administrativo)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Telefone</h4>
                    <p className="text-white/90 flex items-center mt-1">
                      (11) 99226-8645
                      <a href="https://wa.me/5511992268645" target="_blank" rel="noopener noreferrer" className="ml-2 bg-[#25D366] hover:bg-[#20BD5C] text-white p-1.5 rounded-full inline-flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                        <i className="fab fa-whatsapp text-sm"></i>
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">E-mail</h4>
                    <p className="text-white/90">
                      contato@crc.ind.br
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center bg-white/10 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Horário de atendimento</h4>
                    <p className="text-white/90">
                      Seg a Quin: 08:00 às 17:00<br />
                      Sex: 08:00 às 16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold font-montserrat mb-6 text-darkgray">
                Redes Sociais
              </h3>
              <p className="text-gray-600 mb-6">
                Siga-nos nas redes sociais para ficar por dentro das novidades, lançamentos e promoções.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-[#1877F2] hover:bg-[#0E67E0] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-[#E4405F] hover:bg-[#D32E4D] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-[#0A66C2] hover:bg-[#084E96] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="bg-[#FF0000] hover:bg-[#CC0000] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="bg-[#25D366] hover:bg-[#20BD5C] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
