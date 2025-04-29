import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    contactMutation.mutate(data);
  }

  return (
    <section className="py-20 bg-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
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
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold font-montserrat mb-6 text-darkgray">
                Envie uma mensagem
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo*</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail*</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com.br" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone*</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 98765-4321" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite sua mensagem aqui..." 
                            className="resize-none" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-darkblue text-white font-medium py-3 px-4 rounded-md transition-colors duration-300"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Enviando..." : "Enviar mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/2" data-aos="fade-left" data-aos-duration="1000">
            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <h3 className="text-2xl font-bold font-montserrat mb-6 text-darkgray">
                Informações de contato
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Endereço</h4>
                    <p className="text-gray-600">
                      Av. Industrial, 1500 - Distrito Industrial<br />
                      São Paulo - SP, 04000-000
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Telefone</h4>
                    <p className="text-gray-600">
                      (11) 5555-0000<br />
                      (11) 98765-4321
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">E-mail</h4>
                    <p className="text-gray-600">
                      contato@crcfarois.com.br<br />
                      vendas@crcfarois.com.br
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Horário de atendimento</h4>
                    <p className="text-gray-600">
                      Segunda a Sexta: 08:00 - 18:00<br />
                      Sábado: 08:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold font-montserrat mb-6 text-darkgray">
                Redes Sociais
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary hover:bg-darkblue text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-primary hover:bg-darkblue text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-primary hover:bg-darkblue text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="bg-primary hover:bg-darkblue text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300">
                  <i className="fab fa-youtube"></i>
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
