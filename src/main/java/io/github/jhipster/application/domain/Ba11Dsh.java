package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Ba11Dsh.
 */
@Entity
@Table(name = "ba_11_dsh")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ba11Dsh implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "db_titolo", length = 100)
    private String dbTitolo;

    @Size(max = 400)
    @Column(name = "de_desc", length = 400)
    private String deDesc;

    @Size(max = 1024)
    @Column(name = "de_content", length = 1024)
    private String deContent;

    @OneToMany(mappedBy = "ba11Dsh")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ba12Widget> widgets = new HashSet<>();

    @ManyToOne
    private Ba01Utente user;

    @ManyToOne
    private Ba10Menu menu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDbTitolo() {
        return dbTitolo;
    }

    public Ba11Dsh dbTitolo(String dbTitolo) {
        this.dbTitolo = dbTitolo;
        return this;
    }

    public void setDbTitolo(String dbTitolo) {
        this.dbTitolo = dbTitolo;
    }

    public String getDeDesc() {
        return deDesc;
    }

    public Ba11Dsh deDesc(String deDesc) {
        this.deDesc = deDesc;
        return this;
    }

    public void setDeDesc(String deDesc) {
        this.deDesc = deDesc;
    }

    public String getDeContent() {
        return deContent;
    }

    public Ba11Dsh deContent(String deContent) {
        this.deContent = deContent;
        return this;
    }

    public void setDeContent(String deContent) {
        this.deContent = deContent;
    }

    public Set<Ba12Widget> getWidgets() {
        return widgets;
    }

    public Ba11Dsh widgets(Set<Ba12Widget> ba12Widgets) {
        this.widgets = ba12Widgets;
        return this;
    }

    public Ba11Dsh addWidgets(Ba12Widget ba12Widget) {
        this.widgets.add(ba12Widget);
        ba12Widget.setBa11Dsh(this);
        return this;
    }

    public Ba11Dsh removeWidgets(Ba12Widget ba12Widget) {
        this.widgets.remove(ba12Widget);
        ba12Widget.setBa11Dsh(null);
        return this;
    }

    public void setWidgets(Set<Ba12Widget> ba12Widgets) {
        this.widgets = ba12Widgets;
    }

    public Ba01Utente getUser() {
        return user;
    }

    public Ba11Dsh user(Ba01Utente ba01Utente) {
        this.user = ba01Utente;
        return this;
    }

    public void setUser(Ba01Utente ba01Utente) {
        this.user = ba01Utente;
    }

    public Ba10Menu getMenu() {
        return menu;
    }

    public Ba11Dsh menu(Ba10Menu ba10Menu) {
        this.menu = ba10Menu;
        return this;
    }

    public void setMenu(Ba10Menu ba10Menu) {
        this.menu = ba10Menu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ba11Dsh ba11Dsh = (Ba11Dsh) o;
        if (ba11Dsh.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ba11Dsh.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ba11Dsh{" +
            "id=" + getId() +
            ", dbTitolo='" + getDbTitolo() + "'" +
            ", deDesc='" + getDeDesc() + "'" +
            ", deContent='" + getDeContent() + "'" +
            "}";
    }
}
