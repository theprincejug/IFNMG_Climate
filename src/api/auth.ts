import { supabase } from "@/lib/supabase";

export type Usuario = {
    id: string;
    nome: string;
    email: string;
    senha: string;
}

export const isUsuarioLogado = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error && error.name === 'AuthSessionMissingError') {
    return false;
  }

  if (error) {
    throw new Error("Falha na verificação da sessão do usuário");
  }

  return data.user !== null;
};

export const login = async (email: string, senha: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
    });

    if (error && error.code === 'invalid_credentials') {
        throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.", { cause: 'InvalidLoginCredentials' });
    }

    if (error && error.message === 'missing email or phone') {
        throw new Error("Por favor, forneça um e-mail válido.", { cause: 'InvalidLoginCredentials' });
    }

    if (error) {
        console.table(error);
        throw new Error("Erro ao realizar login.");
    }

    return data.user;
}

export const getUsuarioLogado = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error("Erro ao obter sessão do usuário atual.");
    }

    return data.user;
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error("Erro ao realizar logout.");
    }
}

export const cadastrar = async (usuario: Omit<Usuario, 'id'>) => {
    const { data, error } = await supabase.auth.signUp({
        email: usuario.email,
        password: usuario.senha,
        options: {
            data: {
                display_name: usuario.nome,
            }
        }
    });

    if (error && error.code === 'user_already_exists') {
        throw new Error("O e-mail fornecido já está em uso. Por favor, utilize outro e-mail.", { cause: 'InvalidRegisterCredentials' });
    }

    if (error) {
        console.table(error);
        throw new Error("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.");
    }

    return data.user;
}
